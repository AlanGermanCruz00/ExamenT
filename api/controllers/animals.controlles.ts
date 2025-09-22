import { Request, response, Response } from "express";
import dataBaseService from "../services/data-base.service";
import { Utils } from "../utils";

const utils = new Utils()

class ControllerAnimal {

  public async showAnimals(req: Request, res: Response) {
    const descriptionS = "animals[show]";
    try {
      const rows: any = await dataBaseService.pool?.query('CALL stp_GC_animals()');
      res.json(utils.response(descriptionS, rows[0], false));
    } catch (err) {
      res.status(500).json(utils.response(descriptionS, err, true));
    }
  }


  public async AddAnimals(req: Request, res: Response) {
    const descriptionC = "animals[create]"
    const {name, race, size, color, yearborn, age } = req.body;

    dataBaseService.pool?.query('CALL stp_C_animals(?,?,?,?,?,?)', [name, race, size, color, yearborn, age]).then((Anims) => {
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
      dataBaseService.pool?.query('CALL stp_D_animals(?)', [id]);

      res.json(utils.response(descriptionD, id, false));
    } catch (err) {
      res.status(500).json(utils.response(descriptionD, err, true));

    }
  }

  public async updateAnimals(req: Request, res: Response) {
    const description = "animal[update]";
    const {id} = req.params
    const {name, race, size, color, yearborn, age } = req.body; 
    try {
      const result: any = await dataBaseService.pool?.query(
        'CALL stp_U_animal (?,?,?,?,?,?,?)', [id, name, race, size, color, yearborn, age] );
      res.json(utils.response(description, result[0], false));
    } catch (err) {
       res.status(500).json(utils.response(description, err, true));
    }
  }


}

const Controlleranimal = new ControllerAnimal();
export default Controlleranimal


