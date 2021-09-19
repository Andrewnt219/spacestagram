import { MarsRoverPhoto } from '@mars-rover-photos-api';
import {
  likePhoto,
  selectPhotos,
  unlikePhoto,
} from '@modules/mars-rover-photos';
import { MediaCard } from '@shopify/polaris';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { useImageSizes } from 'src/context';
import css from 'styled-jsx/css';
type PhotoCardProps = {
  /** The data of the photo */
  photo: MarsRoverPhoto;
  /** Whether this photo is liked or not */
  isLiked?: boolean;
};
/** A media card with info and like action for a photo */
export const PhotoCard = ({
  children,
  ...props
}: PropsWithChildren<PhotoCardProps>) => {
  const sizes = useImageSizes();
  const photosSelector = useSelector(selectPhotos);
  const dispatch = useAppDispatch();

  const handlePrimaryActionClick = async () => {
    props.isLiked
      ? dispatch(unlikePhoto(props.photo.id.toString()))
      : dispatch(likePhoto(props.photo.id.toString()));
  };

  return (
    <article>
      <MediaCard
        title={`#${props.photo.id}`}
        description={`Rover ${props.photo.rover.name} - ${
          props.photo.camera.full_name
        }. Earth day: ${new Date(props.photo.earth_date).toLocaleDateString()}`}
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
