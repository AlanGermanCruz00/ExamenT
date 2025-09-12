import { Request, response, Response } from "express";
import dataBaseService from "../services/data-base.service";
import { Utils } from "../utils";

const utils = new Utils()

class ControllerAnimal {

  public async showAnimals(req: Request, res: Response) {
    const descriptionS = "animals[show]";
    try {
      const rows: any = await dataBaseService.pool?.query(`SELECT id_animal, name, race, size, color, yearborn, year, create_at FROM tbl_animals `);
      res.json(utils.response(descriptionS, rows, false));
    } catch (err) {
      res.status(500).json(utils.response(descriptionS, err, true));
    }
  }


  public async AddAnimals(req: Request, res: Response) {
    const descriptionC = "animals[create]"
    const { name, race, size, color, yearborn, year } = req.body;

    dataBaseService.pool?.query('CALL stp_S_animal(?,?,?,?,?,?)', [name, race, size, color, yearborn, year]).then((Anims) => {
      const idAnimls = Anims[0][0].id
      res.json(utils.response(descriptionC, idAnimls, false))

    }).catch((err) => { 
       res.status(500).json(utils.response(descriptionC, err, true));
    })
  }

  public async deleteAnimals(req: Request, res: Response) {
    const descriptionD = "animal[delete]";
    const { id } = req.params;

    try {
      dataBaseService.pool?.query(
        'DELETE FROM tbl_animals WHERE id_animal = ?', [id]

      );

      res.json(utils.response(descriptionD, id, false));
    } catch (err) {
      res.status(500).json(utils.response(descriptionD, err, true));

    }
  }

  public async updateAnimals(req: Request, res: Response) {
    const descriptionU = "animal[update]";
    const { id } = req.params;
    const { name, race, size, color, yearborn, year } = req.body;
    try {
      const result: any = await dataBaseService.pool?.query(
        `UPDATE tbl_animals 
       SET name = ?, race = ?, size = ?, color = ?, yearborn = ?,  \`year\` = ?, create_at = NOW() 
       WHERE id_animal = ?`,
        [name, race, size, color, yearborn, year, id]             //PORQUE YEAR '' 
      );
    } catch (err) {
       res.status(500).json(utils.response(descriptionU, err, true));
    }
  }


}

const Controlleranimal = new ControllerAnimal();
export default Controlleranimal


