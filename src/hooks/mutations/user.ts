import {useMutation} from "@tanstack/react-query";
import baseApi from "@/api/baseApi";

type Body = {
    name?: string;
    status?: number;
    id?: number;
    stamp?: string
    username: string;
    password: string;
    role_id: number;
    phone_number: string;
    telegram_id?: string;
};
const userMutation = () => {
    return useMutation({
        mutationKey: ["user_mutation"],
        mutationFn: async (body: Body) => {
            if (body.id) {
                const {data} = await baseApi.put("/update", body);
                return data;
            } else {
                const {data} = await baseApi.post("/register", body);
                return data;
            }
        },
    });
};
export default userMutation;
