import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { Garment, Garments } from "./models/garment.model";
import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import SearchDTO from './dtos/search.dto';

@Injectable()
export class AppService {
    private readonly logger: Logger = new Logger(AppService.name);

    constructor(
        @InjectModel(Garment) private readonly garmentModel: ReturnModelType<typeof Garment>
    ) {}

    // TODO: optimize mongo query
    async findSpecificGarments(search: SearchDTO): Promise<DocumentType<Garment> | Garments | null> {
        // product_title and product_description
        // const data = await this.garmentModel.find().exec();
        const regexQuery = new RegExp("^" + search.search.split(" ").map(x => `(?=.*\\b${x}\\b)`).join("")  + ".*$");
        console.log(regexQuery);
        const mongoRegex = { $regex: regexQuery, $options: 'i' };
        const data = await this.garmentModel
            .aggregate([
                { "$facet": {
                    "data": [
                        { "$match": { $or: [{ product_title: mongoRegex }, { product_description: mongoRegex }]}},
                        { "$skip": search.skip },
                        { "$limit": search.limit }
                    ],
                    "count": [{ "$count": "count" }]}
                }
            ])
            .exec();
        this.logger.log("data: ", data);
        return data;
    }
}
