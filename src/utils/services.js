import {
  AuthService,
  UserService,
  SalonService,
  ServicesService,
  MastersService,
  RecordService,
  StatsService
} from "@/services";

export const services = {
  auth: AuthService.getInstance(),
  user: UserService.getInstance(),
  salon: SalonService.getInstance(),
  services: ServicesService.getInstance(),
  masters: MastersService.getInstance(),
  record: RecordService.getInstance(),
  stats: StatsService.getInstance()
};
