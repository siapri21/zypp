import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lat: number;
    lng: number;
    battery: number;
    status: "idle" | "in_use" | "charging";
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lat: number;
    lng: number;
    battery: number;
    status: "idle" | "in_use" | "charging";
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lat: number;
    lng: number;
    battery: number;
    status: "idle" | "in_use" | "charging";
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lat: number;
    lng: number;
    battery: number;
    status: "idle" | "in_use" | "charging";
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lat: number;
    lng: number;
    battery: number;
    status: "idle" | "in_use" | "charging";
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lat: number;
    lng: number;
    battery: number;
    status: "idle" | "in_use" | "charging";
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=scooters.d.ts.map