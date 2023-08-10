import { ILayer } from "@nitro-design/types"
import { fabric } from "fabric"
import { defaultFrameOptions, LayerType, defaultBackgroundOptions } from "../common/constants"
import { ControllerOptions, Dimension, GradientOptions } from "../common/interfaces"
import setObjectGradient from "../utils/fabric"
import Base from "./Base"
import { loadImageFromURL } from "../utils/image-loader"
import { nanoid } from "nanoid"

class Frame extends Base {
  constructor(props: ControllerOptions) {
    super(props)
    this.initialize()
  }

  initialize() {
    const frame = new fabric.Frame({
      ...defaultFrameOptions,
      absolutePositioned: this.config.clipToFrame,
    })
    const background = new fabric.Background({
      ...defaultBackgroundOptions,
      shadow: this.config.shadow,
    })

    this.canvas.add(frame, background)
    const center = this.canvas.getCenter()
    frame.center()
    background.center()

    this.state.setFrame({
      height: defaultFrameOptions.width,
      width: defaultFrameOptions.height,
    })

    setTimeout(() => {
      this.editor.zoom.zoomToFit()
      this.editor.history.initialize()
    }, 50)
  }

  get frame() {
    return this.canvas.getObjects().find((object) => object.type === LayerType.FRAME) as Required<fabric.Frame>
  }

  get background() {
    return this.canvas
      .getObjects()
      .find((object) => object.type === LayerType.BACKGROUND) as Required<fabric.Background>
  }

  get backgroundImage() {
    return this.canvas
      .getObjects()
      .find((object) => object.type === LayerType.BACKGROUND_IMAGE) as unknown as Required<fabric.BackgroundImage>
  }

  get isBackgroundImageSet() {
    return !!this.backgroundImage
  }

  get options(): Required<ILayer> {
    const options = this.frame.toJSON(this.config.propertiesToInclude)
    return options as Required<ILayer>
  }

  public resize({ height, width }: Dimension) {
    this.state.setFrame({
      height,
      width,
    })
    const frame = this.frame
    const background = this.background
    frame.set({ width, height })
    frame.center()
    if (background) {
      background.set({ width, height })
      background.center()
    }
    this.editor.zoom.zoomToFit()
  }

  public setHoverCursor = (cursor: string) => {
    const background = this.background
    if (background) {
      background.set("hoverCursor", cursor)
    }
  }

  public setBackgroundColor = (color: string) => {
    const background = this.background
    if (this.isBackgroundImageSet) {
      this.unsetBackgroundImage()
    }

    if (background) {
      background.set({
        fill: color,
      })
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  public setBackgroundGradient = ({ angle, colors }: GradientOptions) => {
    const background = this.background
    if (background) {
      setObjectGradient(background, angle, colors)
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  public setBackgroundImage = async (url: string) => {
    const background = this.backgroundImage
    console.log("background", background)
    if (!background) {
      const frame = this.editor.frame.frame
      const image = await loadImageFromURL(url)
      const backgroundImage = new fabric.BackgroundImage(image, { id: nanoid() })
      // @ts-ignore
      this.canvas.add(backgroundImage)
      backgroundImage.clipPath = frame

      this.scale("fill", backgroundImage.id)
      backgroundImage.moveTo(2)

      this.canvas.requestRenderAll()
      this.editor.history.save()
    } else {
      // Replace the image
      const image = await loadImageFromURL(url)
      this.unsetBackgroundImage()

      const backgroundImage = new fabric.BackgroundImage(image, {id: nanoid() })
      // @ts-ignore
      this.canvas.add(backgroundImage)
      backgroundImage.clipPath = this.frame

      this.scale("fill", backgroundImage.id)
      backgroundImage.moveTo(2)

      this.canvas.requestRenderAll()
      this.editor.history.save()
    }

  }

  public unsetBackgroundImage = () => {
    const backgroundImage = this.backgroundImage
    if (backgroundImage) {
      // @ts-ignore
      this.canvas.remove(backgroundImage)
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  private scale = (type: "fill" | "fit", id: string) => {
    let refObject: any = this.canvas.getActiveObject() as Required<fabric.Object>
    const { width, height, top } = this.editor.frame.frame
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      let scaleX = width / refObject.width
      let scaleY = height / refObject.height
      const scaleMax = Math.max(scaleX, scaleY)
      const scaleMin = Math.min(scaleX, scaleY)

      if (type === "fit") {
        refObject.set({
          scaleX: scaleMin,
          scaleY: scaleMin,
        })
      }
      if (type === "fill") {
        refObject.set({
          scaleY: scaleMax,
          scaleX: scaleMax,
        })
      }
      refObject.center()
      if (scaleY >= scaleX) {
        refObject.set("top", top)
      }
    }
  }

  private findOneById = (id: string) => {
    return this.canvas.getObjects().find((object) => object.id === id)
  }

  public getBoundingClientRect() {
    const frame = this.frame
    return frame.getBoundingRect()
  }

  get fitRatio() {
    const options = this.frame as Required<fabric.Frame>
    const canvasWidth = this.canvas.getWidth() - this.config.frameMargin
    const canvasHeight = this.canvas.getHeight() - this.config.frameMargin
    let scaleX = canvasWidth / options.width
    let scaleY = canvasHeight / options.height
    if (options.height >= options.width) {
      scaleX = scaleY
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX))
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX))
      }
    }
    return scaleX
  }
}
export default Frame
