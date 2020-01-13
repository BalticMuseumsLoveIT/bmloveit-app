import {
  StyledWrapper,
  StyledImage,
  StyledButton,
} from 'components/ImageMap/ImageMap.style';
import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { action } from 'mobx';
import { useHistory } from 'react-router-dom';

interface ImageMapProps {
  src: string;
  coordinates: Array<{ x: number; y: number; link: string }>;
}

export const ImageMap = (props: ImageMapProps) => {
  const history = useHistory();

  const imageStore = useLocalStore(() => ({
    loaded: false,
    dimensions: { width: NaN, height: NaN },
    setLoaded: action((loaded: boolean) => {
      imageStore.loaded = loaded;
    }),
    setWidth: action((width: number) => {
      imageStore.dimensions.width = width;
    }),
    setHeight: action((height: number) => {
      imageStore.dimensions.height = height;
    }),
    get widthScaleFactor() {
      if (!imageStore.loaded) return 0;

      return imageStore.dimensions.width >= imageStore.dimensions.height
        ? imageStore.dimensions.height / imageStore.dimensions.width
        : 1;
    },
    get heightScaleFactor() {
      if (!imageStore.loaded) return 0;

      return imageStore.dimensions.height >= imageStore.dimensions.width
        ? imageStore.dimensions.width / imageStore.dimensions.height
        : 1;
    },
  }));

  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useLayoutEffect(() => {
    if (imageRef.current) {
      imageRef.current.addEventListener('load', () => {
        if (imageRef.current) {
          imageStore.setWidth(imageRef.current.naturalWidth);
          imageStore.setHeight(imageRef.current.naturalHeight);
          imageStore.setLoaded(true);
        }
      });
    }
  });

  return useObserver(() => (
    <StyledWrapper>
      <StyledImage alt="" ref={imageRef} src={props.src} />
      {imageStore.loaded &&
        props.coordinates.map(point => {
          return (
            <StyledButton
              x={point.x}
              y={point.y}
              width={imageStore.dimensions.width}
              height={imageStore.dimensions.height}
              widthSF={imageStore.widthScaleFactor}
              heightSF={imageStore.heightScaleFactor}
              key={`${point.x}${point.y}`}
              onClick={() => (point.link && history.push(point.link)) || false}
            />
          );
        })}
    </StyledWrapper>
  ));
};

export default ImageMap;
