const Tools = {
	exportJson(name,date){
		let blod = new Blob([data]); // 创建 blob 对象
		let link = document.createElement('a'); 
		link.href = URL.createObjectURL(blod);// 创建一个 URL 对象并传给 a 元素的 href
		link.download = name // 设置下载的默认文件名
		link.click();
	}
}
export default Tools