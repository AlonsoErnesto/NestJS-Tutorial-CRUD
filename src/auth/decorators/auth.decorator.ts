import { UseGuards, applyDecorators } from "@nestjs/common";
import { ValidRoles } from "../interfaces";
import { RoleProctected } from "./role-proctected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";

export function Auth(...roles:ValidRoles[]){
   return applyDecorators(
      RoleProctected(ValidRoles.superUser, ValidRoles.admin),
      UseGuards(AuthGuard(), UserRoleGuard)
   );
}