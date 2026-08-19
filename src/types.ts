/**
 * OA 共享类型契约
 *
 * - LayoutSchema / FieldSchema / FieldType / LayoutType / Widget* 等核心类型集中在此
 * - 由 oa-utils 维护，oa-form 与 oa-designer 通过 `import type` 引用，避免包间循环依赖
 * - oa-form 实现 Widget 组件库；oa-designer 运行时依赖 form 的 Widget registry
 */

import type { ReactNode, ComponentType } from 'react'

// ---------------------------------------------------------------------------
// 布局模式：描述页面整体的排版方式
// ---------------------------------------------------------------------------
export type LayoutType =
  | 'flow'      // 流式布局：从上到下依次排列（最常用）
  | 'grid'      // 栅格布局：多列栅格（2/3/4 列）
  | 'table'     // 表格式布局：行列结构
  | 'free'      // 自由布局：可绝对定位 / 拖拽定位

// ---------------------------------------------------------------------------
// 字段类型：设计器可添加的各种"组件"
// ---------------------------------------------------------------------------
export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'date-range'
  | 'select'
  | 'user-picker'
  | 'radio'
  | 'checkbox'
  | 'upload'
  | 'heading'
  | 'paragraph'
  | 'divider'
  | 'image'

// ---------------------------------------------------------------------------
// 通用选项（select/radio/checkbox 共用）
// ---------------------------------------------------------------------------
export interface FieldOption {
  label: string
  value: string
}

// ---------------------------------------------------------------------------
// 字段 Schema：设计器中每个组件的抽象描述
// ---------------------------------------------------------------------------
export interface FieldSchema {
  id: string
  type: FieldType
  label: string
  // 输入类字段
  required?: boolean
  placeholder?: string
  options?: FieldOption[]
  defaultValue?: string | number | string[] | number[]
  // 展示类字段
  content?: string
  // 栅格 / 布局相关
  colSpan?: number
  width?: number
  height?: number
}

// ---------------------------------------------------------------------------
// 布局 Schema（designer 的核心产物）
// ---------------------------------------------------------------------------
export interface LayoutSchema {
  id: string
  name: string
  type: LayoutType
  fields: FieldSchema[]
  columns?: number
}

// ===========================================================================
// Widget 三视图标准（由 designer 定义，由 oa-form 实现）
// ===========================================================================

/**
 * 运行视图 Props
 * 实际填写表单时的视图（FormRenderer 使用）
 */
export interface WidgetRuntimeProps {
  field: FieldSchema
  value?: string | number | (string | number)[] | undefined
  onChange?: (value: string | number | (string | number)[]) => void
  readOnly?: boolean
}

/**
 * 设计视图 Props
 * 设计器画布中展示的视图（DesignCanvas 使用）
 * 通常是不可交互的预览态
 */
export interface WidgetDesignProps {
  field: FieldSchema
  selected?: boolean
}

/**
 * 配置视图 Props
 * 设计器右侧属性面板的视图（PropertyPanel 使用）
 * 负责编辑该字段的属性
 */
export interface WidgetConfigProps {
  field: FieldSchema
  onChange: (patch: Partial<FieldSchema>) => void
}

/**
 * Widget 定义：一个字段类型的完整三视图
 *
 * - type:        字段类型
 * - label:       显示名（字段库中展示）
 * - category:    分类（input 输入采集 / display 信息展示）
 * - icon:        字段库图标
 * - RuntimeView: 运行视图组件（实际填写时）
 * - DesignView:  设计视图组件（设计器画布中）
 * - ConfigView:  配置视图组件（右侧属性面板）
 *
 * 这套标准由 oa-designer 定义，oa-form 实现具体组件并注册到 registry
 */
export interface WidgetDefinition {
  type: FieldType
  label: string
  category: 'input' | 'display'
  icon?: ReactNode
  RuntimeView: ComponentType<WidgetRuntimeProps>
  DesignView: ComponentType<WidgetDesignProps>
  ConfigView: ComponentType<WidgetConfigProps>
}
