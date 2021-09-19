import {
  Photo_ToggleLike_GetData,
  Photo_ToggleLike_GetQuery,
} from '@api/photo/toggleLike';
import { MarsRoverPhoto } from '@mars-rover-photos-api';
import { selectUserAuth } from '@modules/user-auth';
import { MediaCard } from '@shopify/polaris';
import { getErrorMessage } from '@utils/api-utils';
import axios from 'axios';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
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
  const userAuth = useSelector(selectUserAuth);
  const sizes = useImageSizes();

  const handlePrimaryActionClick = async () => {
    if (!userAuth?.userId) return;

    try {
      const params: Photo_ToggleLike_GetQuery = {
        photo_id: props.photo.id.toString(),
        user_id: userAuth?.userId,
      };
      await axios.get<Photo_ToggleLike_GetData>('/api/photo/toggleLike', {
        params,
      });
    } catch (error) {
      console.log(getErrorMessage(error));
    }
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
          content: props.isLiked ? 'Unlike' : 'Like',
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
