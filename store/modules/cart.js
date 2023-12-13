export default {
	state: {
		items: []
	},
	mutations: {
		//添加商品
		setItems(state, items) {
			state.items = [...state.items, items]
		},
		//清空购物车
		clearItems(state) {
			state.items = []
		},
		deleteItems(state, items) {
			//查找对应位置
			const index = state.items.findIndex((index) => items._id === index._id)
			// 删除对应项
			state.items.splice(index, 1)
		}
	}
}