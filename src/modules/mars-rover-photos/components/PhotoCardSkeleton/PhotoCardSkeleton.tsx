import {
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from '@shopify/polaris';
import React from 'react';

/** A skeleton with roughly the same size as `PhotoCard` */
export const PhotoCardSkeleton = () => {
  return (
    <Card sectioned>
      <TextContainer>
        <SkeletonDisplayText />
        <SkeletonBodyText lines={30} />
      </TextContainer>
    </Card>
  );
};
