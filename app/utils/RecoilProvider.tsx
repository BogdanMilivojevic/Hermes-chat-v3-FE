'use client';

import { RecoilRoot } from 'recoil';

export default function RecoilProvider({
    children,
}: {
  children: JSX.Element,
}) {

    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}