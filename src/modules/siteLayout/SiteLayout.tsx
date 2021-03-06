import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ReactNode } from "react";
import styled from "styled-components";
import { Sidebar, SidebarProps } from "./Sidebar";

const WhiteLayout = styled(Layout)`
  background-color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
`;

const InnterLayout = styled(Layout)`
  background-color: #ffffff;
`;

interface SiteLayoutProps extends SidebarProps {
  children?: ReactNode;
}

export function SiteLayout({
  children,
  ...props
}: SiteLayoutProps): JSX.Element {
  return (
    <WhiteLayout>
      <Sidebar {...props} />
      <InnterLayout style={{ marginLeft: 200 }}>
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "24px 16px", overflow: "initial" }}>
          {children}
        </Content>
      </InnterLayout>
    </WhiteLayout>
  );
}
