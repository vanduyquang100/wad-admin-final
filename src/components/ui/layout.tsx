import { FC, HTMLAttributes, ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";
import { twMerge } from "tailwind-merge";

export interface BasicLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const BasicLayout: FC<BasicLayoutProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={twMerge("h-svh w-screen", className)} {...props}>
      {children}
    </div>
  );
};

export type SidebarComponentType = FC;

export interface SidebarLayoutProps extends BasicLayoutProps {
  SidebarComponent: SidebarComponentType;
}

export const SidebarLayout: FC<SidebarLayoutProps> = ({
  children,
  SidebarComponent,
}) => {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <main className="grow">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
