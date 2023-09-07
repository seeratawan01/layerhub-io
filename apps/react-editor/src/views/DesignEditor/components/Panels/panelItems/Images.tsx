import React from "react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { images } from "~/constants/mock-data"
import { useEditor } from "@nitro-design/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { nanoid } from "nanoid"

export default function() {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const HEADSHOT_AVATAR = {
    "id": nanoid(),
    "name": "Headshot-Avatar",
    "radius": 100,
    "angle": 0,
    "stroke": null,
    "strokeWidth": 0,
    "left": -411.4,
    "top": -103.53,
    "width": 203,
    "height": 203,
    "opacity": 1,
    "originX": "left",
    "originY": "top",
    "scaleX": 1.02,
    "scaleY": 1.02,
    "type": "StaticImage",
    "flipX": false,
    "flipY": false,
    "skewX": 0,
    "skewY": 0,
    "visible": true,
    "shadow": null,
    "src": 'https://i.ibb.co/82ZTxtj/Untitled-design-3.png',
    "cropX": 0,
    "cropY": 0,
    "metadata": {},
    "autoScale": true,
  }

  const HEADSHOT_NAMES = {
    "id": nanoid(),
    "name": "Headshot-Names",
    "angle": 0,
    "stroke": null,
    "strokeWidth": 0,
    "left": -164.65,
    "top": -75.4,
    "width": 576.05,
    "height": 150.68,
    "opacity": 1,
    "originX": "left",
    "originY": "top",
    "scaleX": 1,
    "scaleY": 1,
    "type": "Group",
    "flipX": false,
    "flipY": false,
    "skewX": 0,
    "skewY": 0,
    "visible": true,
    "shadow": null,
    "objects": [
      {
        "id": nanoid(),
        "name": "Headshot-Name",
        "angle": 0,
        "stroke": null,
        "strokeWidth": 0,
        "left": -288.02,
        "top": -75.34,
        "width": 576.05,
        "height": 84.23,
        "opacity": 1,
        "originX": "left",
        "originY": "top",
        "scaleX": 1,
        "scaleY": 1,
        "type": "StaticText",
        "flipX": false,
        "flipY": false,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "shadow": null,
        "charSpacing": 0,
        "fill": "#333333",
        "fontFamily": "Poppins-Light",
        "fontSize": 74.53824946898108,
        "lineHeight": 1.16,
        "text": "Seerat Awan",
        "textAlign": "left",
        "fontURL": "https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8V1tvFP-KUEg.ttf",
        "metadata": {}
      },
      {
        "id": nanoid(),
        "name": "Headshot-Username",
        "angle": 0,
        "stroke": null,
        "strokeWidth": 0,
        "left": -288.02,
        "top": 17.18,
        "width": 571.99,
        "height": 58.16,
        "opacity": 1,
        "originX": "left",
        "originY": "top",
        "scaleX": 1,
        "scaleY": 1,
        "type": "StaticText",
        "flipX": false,
        "flipY": false,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "shadow": null,
        "charSpacing": 0,
        "fill": "#636363ff",
        "fontFamily": "KoHo-Light",
        "fontSize": 51.46490297574535,
        "lineHeight": 1.16,
        "text": "@seeratawan01",
        "textAlign": "left",
        "fontURL": "https://fonts.gstatic.com/s/koho/v6/K2FxfZ5fmddNPoU2WJ75JoKhHys.ttf",
        "metadata": {}
      }
    ]
  }


  const HEADSHOT_PRESET_MAIN = {
    "id": nanoid(),
    "name": "Headshot",
    "angle": 0,
    "stroke": null,
    "strokeWidth": 0,
    "left": 285.32,
    "top": 646.47,
    "width": 822.79,
    "height": 207.06,
    "opacity": 1,
    "originX": "left",
    "originY": "top",
    "scaleX": 1,
    "scaleY": 1,
    "type": "Group",
    "flipX": false,
    "flipY": false,
    "skewX": 0,
    "skewY": 0,
    "visible": true,
    "shadow": null,
    "objects": [
      HEADSHOT_AVATAR,
      HEADSHOT_NAMES
    ]
  }


  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {

        // editor.frame.setBackgroundImage(url)
        const options = {
          ...HEADSHOT_PRESET_MAIN,
          // type: "StaticImage",
          // "rx": 100,
          // src: 'https://imgtr.ee/images/2023/08/27/099707535a520e5cf5c11697a7d6bf2c.png',
          // // rx: 100,
          // metadata: {
          //   // removeable: false,
          // },
          // width: 203,
          // height: 203
        }

        // @ts-ignore
        editor.objects.add(options)
      }
    },
    [editor]
  )

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem"
        }}
      >
        <Block>Images</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>
          <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>
            {images.map((image, index) => {
              return <ImageItem key={index} onClick={() => addObject(image.src.large)} preview={image.src.small} />
            })}
          </div>
        </Block>
      </Scrollable>
    </Block>
  )
}

function ImageItem({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1
        }
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1
          }
        })}
      ></div>
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle"
        })}
      />
    </div>
  )
}
