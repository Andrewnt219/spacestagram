import {
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from '@shopify/polaris';
import React from 'react';

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
