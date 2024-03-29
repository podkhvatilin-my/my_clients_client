import BaseHttpService from "@/services/baseHttp.service";

export class MastersService extends BaseHttpService {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!MastersService.instance) {
      MastersService.instance = new MastersService();
    }

    return MastersService.instance;
  }

  get endpoints() {
    return this.getEndpoints("masters");
  }

  getList() {
    return this.get(this.endpoints.getList);
  }

  getListBySalon(salonId) {
    return this.get(
      this.endpoints.getSalonMasters.replace("{:salonId}", String(salonId))
    );
  }

  getMaster(id) {
    return this.get(this.endpoints.getMaster.replace("{:id}", String(id)));
  }

  createMaster(data) {
    return this.post(this.endpoints.create, data);
  }

  removeMaster(id) {
    return this.delete(this.endpoints.remove.replace("{:id}", String(id)));
  }

  changeInfo(id, data) {
    return this.patch(
      this.endpoints.changeInfo.replace("{:id}", String(id)),
      data
    );
  }

  changeEmail(id, data) {
    return this.patch(
      this.endpoints.changeEmail.replace("{:id}", String(id)),
      data
    );
  }

  changePassword(id, data) {
    return this.patch(
      this.endpoints.changePassword.replace("{:id}", String(id)),
      data
    );
  }

  changeSalon(data) {
    return this.post(this.endpoints.changeSalon, data);
  }

  changeWorkDays(data) {
    return this.post(this.endpoints.changeWorkDays, data);
  }

  changeServices(data) {
    return this.post(this.endpoints.changeServices, data);
  }

  addDateInfo(data) {
    return this.post(this.endpoints.addDateInfo, data);
  }

  removeDateInfo(data) {
    return this.post(this.endpoints.removeDateInfo, data);
  }
}
