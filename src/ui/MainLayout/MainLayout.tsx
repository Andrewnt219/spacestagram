import { userAuthSlice } from '@modules/user-auth';
import { Frame } from '@shopify/polaris';
import { nanoid } from 'nanoid';
import React, { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from 'src/app/store';

type MainLayoutProps = {};

/** Page layout to store navigations, drawers, footer, etc. */
export const MainLayout = ({
  children,
}: PropsWithChildren<MainLayoutProps>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userId') ?? nanoid(16);

    dispatch(userAuthSlice.actions.login({ userId }));
  }, [dispatch]);

  return (
    <Frame>
      <main>{children}</main>
    </Frame>
  );
};
