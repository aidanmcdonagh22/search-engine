import { prop } from "@typegoose/typegoose";
import { Image } from "./image.model";

export class Garment {
    @prop({ required: true, unique: true })
    product_id: number;

    @prop({ type: () => [String], required: true })
    product_categories_mapped: string[];

    @prop({ required: true })
    url: string;

    @prop({ required: true })
    gender: string;

    @prop({ required: true })
    price: number;

    @prop({ index: true, required: true })
    product_description: string;

    @prop({ type: () => [String], required: true })
    image_urls: string[];

    @prop({ type: () => [String], required: true })
    product_imgs_src: string[];

    @prop({ required: true })
    source: string;

    @prop({ type: () => [String], required: true })
    product_categories: string[];

    @prop({ type: () => [Image], required: true })
    images: Image[];

    @prop({ type: () => [String], required: true })
    position: string[];

    @prop({ index: true, required: true })
    product_title: string;

    @prop({ required: true })
    brand: string;

    @prop({ required: true })
    currency_code: string;

    @prop({ required: true })
    stock: number;
}

// export const garmentSchema = buildSchema(Garment);
// export const GarmentModel = addModelToTypegoose(mongoose.model('Garment', garmentSchema), Garment);


export type Garments = Garment[];