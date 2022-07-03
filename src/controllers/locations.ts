import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller("locations")
export class LocationsController {
  @Get("")
  getUserProfile(_: Request, response: Response): void {
    response.send([{ name: "Barber shop" }]);
  }
}
