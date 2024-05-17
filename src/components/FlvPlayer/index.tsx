import FlvJs from "flv.js";
import { FC, useEffect, useRef } from "react";

type FlvPlayerProp = {
  url?: string;
};
const FlvPlayer: FC<FlvPlayerProp> = (props) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current === null || props.url === null) return;
    const flvPlayer = FlvJs.createPlayer(
      {
        type: "flv",
        isLive: true,
        url: props.url,
      },
      {
        enableStashBuffer: true,
        stashInitialSize: 128,
      }
    );

    FlvJs.LoggingControl.enableError = false;
    FlvJs.LoggingControl.enableWarn = false;

    flvPlayer.on(FlvJs.Events.ERROR, (err) => {
      console.log("Looix", err);
      flvPlayer.unload();
      flvPlayer.detachMediaElement();
    });
    flvPlayer.attachMediaElement(ref.current);
    flvPlayer.load();
    flvPlayer.play();
    console.log(flvPlayer);
  }, [props.url]);
  return <video ref={ref} controls />;
};

export default FlvPlayer;
