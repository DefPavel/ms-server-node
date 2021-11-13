// библиотека для работы с датой
const moment = require("moment");
moment.locale("ru");

const PersonModel = require('../../models/person.model');

// Рендер главной страницы
exports.GetHomeView = async (req, res) => {

    // Посещение Общежития №2
    const countPersInVisit2 = await PersonModel.getPersonVisitInHostel(7);
    const countPersOutVisit2 = await PersonModel.getPersonVisitOutHostel(7);

    const countPersInVisit3 = await PersonModel.getPersonVisitInHostel(8);
    const countPersOutVisit3 = await PersonModel.getPersonVisitOutHostel(8);

    const countPersInVisit4 = await PersonModel.getPersonVisitInHostel(9);
    const countPersOutVisit4 = await PersonModel.getPersonVisitOutHostel(9);

    const countPersInVisit5 = await PersonModel.getPersonVisitInHostel(10);
    const countPersOutVisit5 = await PersonModel.getPersonVisitOutHostel(10);

    const countPersInVisit7 = await PersonModel.getPersonVisitInHostel(12);
    const countPersOutVisit7 = await PersonModel.getPersonVisitOutHostel(12);

    res.render('home', { 
        to_day: moment().format('LL'),
        title: 'Главная страница' , 
        name_link: '/home' ,

        countPersInVisit2: countPersInVisit2 ,
        countPersOutVisit2: countPersOutVisit2,

        countPersInVisit3: countPersInVisit3 ,
        countPersOutVisit3: countPersOutVisit3,


        countPersInVisit4: countPersInVisit4 ,
        countPersOutVisit4: countPersOutVisit4,

        countPersInVisit5: countPersInVisit5 ,
        countPersOutVisit5: countPersOutVisit5,

        countPersInVisit7: countPersInVisit7 ,
        countPersOutVisit7: countPersOutVisit7,

    });
}
