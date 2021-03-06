import {
  StyledButton,
  StyledIcon,
  StyledImage,
  StyledNumber,
  StyledWrapper,
} from 'components/ImageMap/ImageMap.style';
import { ItemMapElementInterface } from 'utils/interfaces';
import React, { RefObject } from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import { action } from 'mobx';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { LocationDescriptorObject } from 'history';
// eslint-disable-next-line import/no-unresolved
import { StateProvider } from 'react-zoom-pan-pinch/dist/store/StateContext';

interface ImageMapProps extends Pick<StateProvider, 'setTransform'> {
  src: string;
  coordinates: Array<ItemMapElementInterface>;
  gridMapRef: RefObject<HTMLDivElement>;
  scale: number;
}

export const ImageMap = (props: ImageMapProps) => {
  const history = useHistory();
  const location = useLocation();

  const imageRef = React.useRef<HTMLImageElement>(null);

  const imageStore = useLocalStore(() => ({
    loaded: false,
    transformed: false,
    dimensions: { width: NaN, height: NaN },
    setLoaded: action((loaded: boolean) => {
      imageStore.loaded = loaded;
    }),
    setTransformed: action((transformed: boolean) => {
      imageStore.transformed = transformed;
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

  React.useLayoutEffect(() => {
    if (imageRef.current) {
      imageRef.current.addEventListener('load', () => {
        if (imageRef.current && !imageStore.transformed) {
          imageStore.setWidth(imageRef.current.naturalWidth);
          imageStore.setHeight(imageRef.current.naturalHeight);
          imageStore.setLoaded(true);

          if (props.gridMapRef && props.gridMapRef.current) {
            const gridMapHeight = props.gridMapRef.current.offsetHeight;
            const imageHeight = imageRef.current.offsetHeight;

            if (gridMapHeight > 0 && imageHeight > 0) {
              const scale = (gridMapHeight * 100) / imageHeight / 100;
              imageStore.setTransformed(true);
              props.setTransform(0, 0, scale);
            }
          }
        }
      });
    }
  });

  return useObserver(() => (
    <StyledWrapper>
      <StyledImage alt="" ref={imageRef} src={props.src} />
      {imageStore.loaded &&
        props.coordinates.map((point, index) => {
          return (
            <StyledButton
              x={point.x}
              y={point.y}
              scale={props.scale}
              width={imageStore.dimensions.width}
              height={imageStore.dimensions.height}
              widthSF={imageStore.widthScaleFactor}
              heightSF={imageStore.heightScaleFactor}
              isCustom={point.icon.length > 0}
              visited={point.visited}
              key={`${point.x}${point.y}`}
              onClick={() => {
                /**
                 * Supported links `?popup=<item_id>` or `/<local_url>`
                 * Do nothing if link is not specified or is not supported
                 */
                if (!point.link || !['/', '?'].includes(point.link.slice(0, 1)))
                  return;

                const isQSLink = point.link.slice(0, 1) === '?';

                const newLocation: LocationDescriptorObject<Location> = isQSLink
                  ? {
                      search: queryString.stringify(
                        {
                          ...queryString.parse(location.search),
                          ...queryString.parse(point.link),
                        } || {},
                      ),
                    }
                  : { pathname: point.link };

                history.push(newLocation);
              }}
            >
              {point.icon ? (
                <StyledIcon src={point.icon} alt="" />
              ) : (
                <StyledNumber viewBox=" 0 0 16 16">
                  <text x="50%" y="50%">
                    {index + 1}
                  </text>
                </StyledNumber>
              )}
            </StyledButton>
          );
        })}
    </StyledWrapper>
  ));
};

export default ImageMap;
