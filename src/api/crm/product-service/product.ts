import {imageAbleInfo, PowerModel, PREFIX_URI_ADMIN_API} from '@/api/common';
import axios from "axios";

export const URI_PRODUCT_API = '/product'


export interface ProductSpecific {
	Inventory: number
	Weight: number
	Volume: number
	Encode: string
	BarCode: string
	Extra: string
}

export interface Product extends PowerModel, ProductSpecific {
	name: string,
	type: number,
	plan: number,
	accountingCategory: string,
	canSellOnline: boolean,
	canUseForDeduct: boolean,
	approvalStatus: number,
	isActivated: boolean,
	description: string,
	coverURL: string,
	purchasedQuantity: number,
	validityPeriodDays: number,
	saleStartDate: Date,
	saleEndDate: Date,

}


export interface ListProductPageRequest {
	ids?: number[];
	likeName?: string;
	storeIds?: number[];
	pageIndex?: number;
	pageSize?: number;
}

export interface ListProductPageReply {
	list: Product[];
	pageIndex: number;
	pageSize: number;
	total: number;
}

export function listProducts(request: ListProductPageRequest) {
	return axios.get<ListProductPageReply>(
		`${PREFIX_URI_ADMIN_API + URI_PRODUCT_API}/products`,
		{
			params: request,
		}
	);
}


export function createProduct(request: Product) {
	return axios.post<Product>(
		`${PREFIX_URI_ADMIN_API + URI_PRODUCT_API}/products`,
		request
	);
}


export interface DeleteProductRequest {
	id: number;
}

export interface DeleteProductReply {
	id: number;
}

export function deleteProduct(request: DeleteProductRequest) {
	return axios.delete<DeleteProductReply>(
		`${PREFIX_URI_ADMIN_API + URI_PRODUCT_API}/products/${request.id}`
	);
}


