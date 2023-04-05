import Form from "@/interface/form";
import axios from 'axios';


const Mixin = {
    data() {
        return {
            message: "Message from MyMixin!",
            results: [] as string[]
        };
    },
    methods: {
    }
};

export default Mixin;