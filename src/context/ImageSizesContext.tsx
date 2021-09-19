import { createContext, ReactNode, useContext } from 'react';
type ImageSizesContext = string;
const ImageSizesContext = createContext<ImageSizesContext | undefined>(
  undefined
);

/** Provide the layout sizes for responsive images in consumed components  */
type ImageSizesProviderProps = {
  children: ReactNode | ReactNode[];
  value: ImageSizesContext;
};
const ImageSizesProvider = ({
  children,
  ...props
}: ImageSizesProviderProps) => {
  return (
    <ImageSizesContext.Provider value={props.value}>
      {children}
    </ImageSizesContext.Provider>
  );
};

/** Get the layout image sizes from the nearest ImageSizesProvider */
const useImageSizes = (): ImageSizesContext => {
  const context = useContext(ImageSizesContext);

  if (context === undefined) {
    throw new Error('Must be use within ImageSizesContext');
  }

  return context;
};

export { ImageSizesProvider, useImageSizes };
