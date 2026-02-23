<script setup>
	import { ref, onMounted, onUnmounted } from 'vue'
	import { createEditor, createToolbar } from '@wangeditor/editor'
	// 引入编辑器样式（建议在 main.js 中全局引入，这里为了演示放在组件内）
	import '@wangeditor/editor/dist/css/style.css'
	
	// 定义组件事件
	const emit = defineEmits(['contentChange'])
	
	// DOM 引用
	const editorElem = ref(null)
	const toolbarElem = ref(null)
	
	// 编辑器和工具栏实例
	let editor = null
	let toolbar = null
	
	// 编辑器配置
	const editorConfig = {
	placeholder: '请输入内容...',
	MENU_CONF: {
		// 如需配置上传图片、视频等功能，可在此处扩展
		// uploadImage: { server: '/api/upload' }
	}
	}
	
	// 工具栏配置（v5 菜单 key 与 v4 不同，需注意对应）
	const toolbarConfig = {
	toolbarKeys: [
		'headerSelect', // 标题
		'bold', 'italic', 'underline', 'strikeThrough', // 文字样式
		'color', 'bgColor', // 文字/背景颜色
		'fontSize', 'fontFamily', // 字号/字体
		'lineHeight', // 行高
		'bulletedList', 'numberedList', 'todo', // 列表
		'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyJustify', // 对齐
		'indent', 'delIndent', // 缩进
		'insertLink', 'uploadImage', 'insertVideo', 'insertTable', 'codeBlock', 'divider', // 插入元素
		'undo', 'redo' // 撤销/重做
	]
	}
	
	onMounted(() => {
	// 创建编辑器实例
	editor = createEditor({
		selector: editorElem.value,
		config: editorConfig,
		mode: 'default' // 可选 'default' 或 'simple'
	})
	
	// 创建工具栏实例
	toolbar = createToolbar({
		editor,
		selector: toolbarElem.value,
		config: toolbarConfig,
		mode: 'default'
	})
	
	// 监听内容变化事件
	editor.on('changed', () => {
		const html = editor.getHtml()
		emit('contentChange', html)
	})
	})
	
	// 组件卸载时销毁实例，防止内存泄漏
	onUnmounted(() => {
	if (editor) {
		editor.destroy()
		editor = null
	}
	if (toolbar) {
		toolbar.destroy()
		toolbar = null
	}
	})
</script>

<template>
  <div id="wangeditor">
    <!-- 工具栏容器 -->
    <div ref="toolbarElem" style="border: 1px solid #ccc; border-bottom: none;"></div>
    <!-- 编辑器容器 -->
    <div ref="editorElem" style="height: 400px; border: 1px solid #ccc; border-top: none;"></div>
  </div>
</template>

<style scoped>
	
</style>