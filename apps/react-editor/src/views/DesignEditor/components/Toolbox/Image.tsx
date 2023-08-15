import { Block } from "baseui/block"
import Common from "./Common"
import Flip from "./Shared/Flip"
import { Slider } from "baseui/slider"
import React from "react"
import { useActiveObject, useEditor } from "@nitro-design/react"
import { Button } from "baseui/button"


export default function() {
  const editor = useEditor()

  const [radius, setRadius] = React.useState(0)
  const activeObject = useActiveObject()


  const setBorderRadius = React.useCallback(
    (value: number) => {
      // @ts-ignore
      editor.objects.update({ radius: value})
      setRadius(value)
    }, [editor, radius])

  React.useEffect(() => {
    if (activeObject) {
      // Calculate the radius for the slider
      // @ts-ignore
      const radiusInPx = activeObject.clipPath.rx * (activeObject.clipPath.scaleX || 1);

      // Get the initial object size
      // @ts-ignore
      const initialSize = Math.min(activeObject.width, activeObject.height);

      // Calculate the radius percentage
      const radiusPct = (radiusInPx / initialSize) * 100;

      // Set the radius
      setRadius(radiusPct);
    }
  }, [activeObject]);

  const handleUpdateSource = React.useCallback(() => {
    if (activeObject) {
      // @ts-ignore
      const src = 'https://pixabay.com/get/g647c597c08308f73f45f0d9063c79d7bb2ebcfc50fd52f693778cd2a3fb8e9d221b8321622ff9565e55d8913a11ecdb7ac92b037303159132ffbb7d818ccd73a_1280.jpg'
      if (src) {

        editor.objects.update({ src })
      }
    }
  }, [activeObject])

  return (
    <Block
      $style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        justifyContent: "space-between",
      }}
    >
      <Block>
        <Flip />
      </Block>
      <Block
        $style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Block
          $style={{
            width: "120px",
            marginRight: "12px"
          }}
        >
          <Button onClick={handleUpdateSource}>Update Src</Button>
          <Slider

            overrides={{
              InnerThumb: () => null,
              ThumbValue: () => null,
              TickBar: () => null,
              Track: {
                style: {
                  paddingRight: 0,
                  paddingLeft: 0
                }
              },
              Thumb: {
                style: {
                  height: "12px",
                  width: "12px"
                }
              }
            }}
            min={0}
            max={200}
            marks={false}
            value={[radius]}
            onChange={({ value }) => {
              setBorderRadius(value[0])
            }}
          />
        </Block>
        <Common />
      </Block>
    </Block>
  )
}
