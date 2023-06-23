import { defineStore } from "pinia";
import { getCookieItem, setCookieItem } from '@/utils/common'
const useCounterStore = defineStore('counter', {
    persist: true,
    state: () => {
        return {
            LeftSide_obj: {} as any, //左边栏某个联系人的数据
            themeMode: getCookieItem('themeMode') ? false : getCookieItem('themeMode'), //true 月光模式  false 日光模式
        }
    },
    actions: {
        switch_LeftSideObj(obj: any) {
            this.LeftSide_obj = obj
        },
        switch_themeMode() {
            if (this.themeMode) {
                this.themeMode = false//  日光模式
                setCookieItem('themeMode', this.themeMode)
                return this.themeMode
            } else {
                this.themeMode = true // 月光模式 
                setCookieItem('themeMode', this.themeMode)
                return this.themeMode
            }
        },
    }
})

export default useCounterStore