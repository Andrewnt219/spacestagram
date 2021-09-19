import { MarsRoverPhoto } from '@mars-rover-photos-api';
import { selectPhotos, toggleLike } from '@modules/mars-rover-photos';
import { MediaCard } from '@shopify/polaris';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { useImageSizes } from 'src/context';
import css from 'styled-jsx/css';
type PhotoCardProps = {
  photo: MarsRoverPhoto;
  isLiked?: boolean;
};
export const PhotoCard = ({
  children,
  ...props
}: PropsWithChildren<PhotoCardProps>) => {
  const sizes = useImageSizes();
  const photosSelector = useSelector(selectPhotos);
  const dispatch = useAppDispatch();

  const handlePrimaryActionClick = async () => {
    dispatch(toggleLike(props.photo.id.toString()));
  };

  return (
    <article>
      <MediaCard
        title={`Rover ${props.photo.rover.name} - ${props.photo.camera.full_name}`}
        description={`Earth day: ${new Date(
          props.photo.earth_date
        ).toDateString()}`}
        portrait
        primaryAction={{
          content:
            photosSelector.status === 'pending'
              ? 'Waiting...'
              : props.isLiked
              ? 'Unlike'
              : 'Like',
          onAction: handlePrimaryActionClick,
        }}
      >
        <div className="img">
          <Image
            layout="fill"
            src={props.photo.img_src}
            alt={`Rover ${props.photo.rover.name} - ${props.photo.camera.full_name}`}
            sizes={sizes}
          />
        </div>
      </MediaCard>

      <style jsx>{styles}</style>
    </article>
  );
};

const styles = css`
  .img {
    width: 100%;
    height: 50rem;
    position: relative;
    background: #ccc;
  }
`;
