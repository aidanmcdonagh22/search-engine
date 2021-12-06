import { prop } from "@typegoose/typegoose";

export class Image {
    @prop({ required: true })
    url: string;

    @prop({ required: true })
    path: string;

    @prop({ required: true })
    checksum: string;
}