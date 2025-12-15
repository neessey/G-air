'use client';
import NextLink, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

interface SafeLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export default function SafeLink({ children, ...props }: SafeLinkProps) {
  return <NextLink {...props}>{children}</NextLink>;
}