import {
  StyledWrapper,
  StyledImage,
  StyledButton,
  StyledIcon,
} from 'components/ImageMap/ImageMap.style';
import { ItemMapElementInterface } from 'utils/interfaces';
import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { action } from 'mobx';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { LocationDescriptorObject } from 'history';

interface ImageMapProps {
  src: string;
  coordinates: Array<ItemMapElementInterface>;
}

export const ImageMap = (props: ImageMapProps) => {
  const history = useHistory();
  const location = useLocation();

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
              isCustom={point.icon.length}
              key={`${point.x}${point.y}`}
              onClick={() => {
                /**
                 * Supported links `?popup=<item_id>` or `/<local_url>`
                 * Do nothing if link is not specified or is not supported
                 */
                if (!point.link || !(point.link.slice(0, 1) in ['/', '?']))
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
              {point.icon && <StyledIcon src={point.icon} alt="" />}
            </StyledButton>
          );
        })}
    </StyledWrapper>
  ));
};

export default ImageMap;
