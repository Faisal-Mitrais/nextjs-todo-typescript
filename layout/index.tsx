import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import {
  FileDoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Header, Content, Footer, Sider } = Layout;
const normalWidht = '20%';
const collapsedWidht = '80px';

const menus = [
  {
    key: '1',
    title: 'Home',
    path: '/home',
    icon: <HomeOutlined />,
  },
  {
    key: '2',
    title: 'About',
    path: '/about',
    icon: <IdcardOutlined />,
  },
  {
    key: '3',
    title: 'Todo List',
    path: '/todo',
    icon: <FileDoneOutlined />,
  },
  {
    key: '4',
    title: 'Statistic',
    path: '/statistic',
    icon: <LineChartOutlined />,
  },
];

function LayoutComponent({
  children,
}: {
  children: React.FC | React.ReactElement;
}) {
  const router = useRouter();
  const [widht, setWidht] = useState(normalWidht);
  const [collapsed, setCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const onTriggered = () => {
    const newCollapsedValue = !collapsed;
    setCollapsed(newCollapsedValue);
    setWidht(newCollapsedValue ? collapsedWidht : normalWidht);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={widht}
        theme="light"
        onBreakpoint={(broken) => {
          setIsDesktop(!broken);
          setCollapsed(broken);
        }}
      >
        <div className="logo" style={{ padding: '10%' }}>
          <Image
            priority
            src="/images/todo.png"
            alt="DoToDo Logo"
            width={800}
            height={500}
            objectFit="contain"
            layout="responsive"
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[
            menus.find((menu) => menu.path === router.pathname)?.key ?? '1',
          ]}
        >
          {menus.map((menu) => (
            <Menu.Item key={menu.key} icon={menu.icon}>
              <Link href={menu.path}>{menu.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{ marginLeft: isDesktop ? widht : `calc(${widht} + 10px)` }}
      >
        <Header
          className="site-layout-background"
          style={{
            position: 'fixed',
            zIndex: 1,
            width: `calc(100% - ${widht} - 20px)`,
            padding: 0,
            margin: 10,
            borderRadius: 10,
            backgroundColor: blue.primary,
          }}
        >
          {isDesktop && (
            <Button
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className="trigger"
              style={{ margin: 10 }}
              onClick={onTriggered}
            />
          )}
        </Header>
        <Content style={{ margin: '100px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2021 Modified by Faisal
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutComponent;
