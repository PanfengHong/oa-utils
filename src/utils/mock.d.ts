/**
 * Mock 引擎：统一的模拟数据开关与匹配
 *
 * 设计要点：
 * 1. 全局开关 `mockEnabled`，由 `setMockEnabled(true/false)` 控制（在应用启动时根据环境变量设置一次）
 * 2. mock 注册表：按 method -> pattern -> handler 组织，pattern 支持路径参数（如 `/api/form/detail/:id`）
 * 3. `matchMock` 在 request.ts 的 request 方法中调用，命中则短路返回 ResponseData，不再发起 axios 请求
 * 4. handler 是同步函数，接收 { params, query, body, headers }，返回 ResponseData（与真实接口结构一致）
 *
 * 这样，业务侧各子包只需调用 registerMocks() 注册自己的 mock 规则，无需改 api.ts 里的调用方式。
 */
import type { ResponseData } from './request';
/** mock 处理函数接收的上下文 */
export interface MockContext {
    /** 路径参数，如 `/api/form/detail/:id` 命中 `/api/form/detail/123` 时，params.id = '123' */
    params: Record<string, string>;
    /** URL query 参数（已解析为对象） */
    query: Record<string, any>;
    /** 请求体（POST/PATCH/PUT 时） */
    body: any;
    /** 请求头 */
    headers: Record<string, string>;
}
/** mock 处理函数：返回标准 ResponseData */
export type MockHandler = (ctx: MockContext) => ResponseData;
/** 异步 mock 处理函数（支持返回 Promise，模拟网络延迟） */
export type AsyncMockHandler = (ctx: MockContext) => ResponseData | Promise<ResponseData>;
/**
 * 启用/禁用 mock。通常在应用入口根据 VITE_USE_MOCK 调用一次。
 */
export declare function setMockEnabled(enabled: boolean): void;
/**
 * 查询当前 mock 是否启用。
 */
export declare function isMockEnabled(): boolean;
/**
 * 注册一条 mock 规则。
 * @param method HTTP 方法（不区分大小写）
 * @param pattern URL 模式，支持 `:param` 路径参数，如 `/api/form/detail/:id`
 * @param handler 处理函数，返回 ResponseData
 */
export declare function registerMock(method: string, pattern: string, handler: AsyncMockHandler): void;
/**
 * 批量注册 mock 规则。
 */
export declare function registerMocks(rules: Array<{
    method: string;
    pattern: string;
    handler: AsyncMockHandler;
}>): void;
/**
 * 尝试按 method + url 匹配已注册的 mock 规则。
 * 命中则调用 handler 并返回其结果（可能为 Promise）；未命中或未启用则返回 null。
 */
export declare function matchMock(method: string, url: string, ctx: Omit<MockContext, 'params'>): ResponseData | Promise<ResponseData> | null;
/**
 * 清空所有已注册的 mock 规则（主要用于测试）。
 */
export declare function clearMocks(): void;
