// Ссылка на конфинг подключения
const config = require('../config');
// Ссылка на модуль sql server
const sql = require('mssql');

module.exports = class Person {

    static async getPersonVisitInHostel(idHostel) {
        const Query = `
        select count(PR.id) as counts
        from[univer].[dbo].PersonRooms PR  
        inner join[univer].[dbo].DepartamentsHostel dp on dp.id = PR.idDepartametHostel  
        inner join[univer].[dbo].Departaments d on d.id = dp.idDepartaments  
        inner join[univer].[dbo].Rooms r on r.id = dp.idRooms  
        inner join[univer].[dbo].Section s on s.id = r.idSection  
        inner join[univer].[dbo].Hostel h on h.id = s.idHostel  
        inner join[univer].[dbo].Buildings bg on bg.id = h.idBuildings  
        inner join[univer].[dbo].Propusk P  on PR.id = P.idPersonRooms  
        WHERE 
        P.status = 'T'
        and 
        P.blocked = 'F' 
        and bg.id = ${idHostel}`;

        const pool = await sql.connect(config);
        const result = await pool.request().query(Query);
        return result.recordset[0].counts;
    }

    static async getPersonVisitOutHostel(idHostel) {
        const Query = `
        select count(PR.id) as counts
        from[univer].[dbo].PersonRooms PR  
        inner join[univer].[dbo].DepartamentsHostel dp on dp.id = PR.idDepartametHostel  
        inner join[univer].[dbo].Departaments d on d.id = dp.idDepartaments  
        inner join[univer].[dbo].Rooms r on r.id = dp.idRooms  
        inner join[univer].[dbo].Section s on s.id = r.idSection  
        inner join[univer].[dbo].Hostel h on h.id = s.idHostel  
        inner join[univer].[dbo].Buildings bg on bg.id = h.idBuildings  
        inner join[univer].[dbo].Propusk P  on PR.id = P.idPersonRooms  
        WHERE 
        P.status = 'F'
        and 
        P.blocked = 'F' 
        and bg.id = ${idHostel}`;

        const pool = await sql.connect(config);
        const result = await pool.request().query(Query);
        return result.recordset[0].counts;
    }

}