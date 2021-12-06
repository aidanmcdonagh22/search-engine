import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class SearchDTO {
    @IsString()
    @IsNotEmpty()
    search: string;

    @IsNumber()
    @IsNotEmpty()
    skip: number;

    @IsNumber()
    @IsNotEmpty()
    limit: number;
}