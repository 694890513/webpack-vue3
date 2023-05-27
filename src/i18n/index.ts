import { createI18n } from 'vue-i18n';
import pinia from '@/stores/index';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/stores/common'
import enLocal from 'element-plus/lib/locale/lang/en'
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn'
import { EmptyObjectType } from '@/types';

// 读取 pinia 默认语言
const stores = useCommonStore(pinia);
const { getGlobalIi18n } = storeToRefs(stores);

// 定义变量内容
const messages = {} as any;
const element = { en: enLocal, 'zh': zhcnLocale} as any;
const itemize = { en: [], 'zh': [] } as any;
const modules: Record<string, any> = {};
const moduleFiles = require.context('./', true, /\.ts$/);
moduleFiles.keys().forEach((key) => {
  modules[key] = moduleFiles(key);
});

for (const path in modules) {
	const key = path.match(/(\S+)\/(\S+).ts/);
	if (itemize[key![2]]) itemize[key![2]].push(modules[path].default);
	else itemize[key![2]] = modules[path];
}

// 合并数组对象（非标准数组对象，数组中对象的每项 key、value 都不同）
function mergeArrObj(list:any, key: string) {
	let obj = {};
	list[key].forEach((i: EmptyObjectType) => {
		obj = Object.assign({}, obj, i);
	});
	return obj;
}

// 处理最终格式
for (const key in itemize) {
	if (key === 'index') continue;
	messages[key] = {
		name: key,
		el: (element[key]).el,
		message: mergeArrObj(itemize, key),
	};
}

export const i18n = createI18n({
	legacy: false,
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	locale: getGlobalIi18n.value as unknown as string,
	fallbackLocale: zhcnLocale.name,
	messages,
});
