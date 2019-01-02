const formatDao = require("../dao/formatDao");
const formatController={
    queryTCWFInfoG:function (req, res) {
        formatDao.queryTypeInfo()
            .then(function (data1) {
                formatDao.queryColorInfo()
                    .then(function (data2) {
                        formatDao.queryWoodInfo()
                            .then(function (data3) {
                                formatDao.queryFvInfo()
                                    .then(function (data4) {
                                        res.send({
                                            typeInfo:data1,
                                            colorInfo:data2,
                                            woodInfo:data3,
                                            fvInfo:data4})
                                    })
                            })
                    })
            })
    },
    addColor:function (req,res) {
        formatDao.queryColorIsExist([req.query.colorName])
            .then(function (data1) {
                if (data1.length>0){
                    res.send("该颜色已存在");
                }
                else {
                    formatDao.insertColor([req.query.colorName])
                        .then(function (data2) {
                            formatDao.queryColorInfo()
                                .then(function (data3) {
                                    res.send(data3);
                                })
                        })
                }

            })
    },
    deleteColor:function (req, res) {
        formatDao.queryColorGoods([req.query.colorId])
            .then(function (data1) {
                if (data1.length>0){
                    res.send("该类型下面有商品，不能删除")
                }
                else {
                    formatDao.deleteColor([req.query.colorId])
                        .then(function (data2) {
                            formatDao.queryColorInfo()
                                .then(function (data3) {
                                    res.send(data3);
                                })
                        })
                }
            })
    },
    colorEditQuery:function (req,res) {
        formatDao.queryColorById([req.query.colorId])
            .then(function (data1) {
                res.send(data1);
            })
    },
    colorEdit:function (req, res) {
        formatDao.queryColorIsExist([req.query.colorNameEdit])
            .then(function (data1) {
                res.send(data1);

            })
    },
    colorEditTrue:function (req, res) {
        console.log(req.query);
            formatDao.updateColor([req.query.colorNameEdit,req.query.colorIdEdit])
                .then(function (data2) {
                    formatDao.queryColorInfo()
                        .then(function (data3) {
                            res.send(data3);
                        })
                })

    },

};
module.exports=formatController;