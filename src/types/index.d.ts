// 声明一个模块，防止引入文件时报错
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';
declare module '*.ts';
declare module '*.js';

declare module 'js-cookie';

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 申明 数组
declare type EmptyArrayType<T = any> = T[];

// 申明 对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T;
};

// 申明分页数据格式
declare interface PageData<T = any> {
  list: T[];
}

// 申明分页请求数据格式
declare interface PageRequestData<T = any> {
  page: number;
  size: number;
  [key: string]: any;
}

// 申明路由数据格式
declare interface RouteData<T = any> {
  path: string;
  name: string | symbol | undefined | null;
  component: any;
  meta?: {
    title: string;
    isKeepAlive?: boolean;
    loading?: boolean;
    roles?: string[];
    icon?: string;
  };
  children?: RouteData[];
  redirect?: string;
  query?: { [key: string]: T };
	params?: { [key: string]: T };
}

// 声明路由当前项类型集合
declare type RouteDatas<T extends RouteData = any> = T[];