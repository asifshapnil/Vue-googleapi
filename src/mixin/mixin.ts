import Vue from "vue";

const Mixin = {
    data() {
        return {
            message: "Message from MyMixin!"
        };
    },
    methods: {
        getData() {
            console.log(1);            
        }
    }
};

export default Mixin;