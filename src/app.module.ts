import { Block } from './core/block.ts';

export abstract class Module {
  abstract declarations: any[];
  abstract imports: Module[];
}

export abstract class Component extends Block {
  abstract selector: string;
}

// export class AppModule extends Module {
//   declarations: any[] = [
//     RemoveUserDialog,
//     Register,
//     Login,
//     LoginForm,
//     Profile,
//     Chats,
//     Page500,
//     Page404,
//     AddUserDialog,
//     ChangePasswordDialog,
//     ChangeUserDataDialog,
//     ChatMenu,
//     ClipMenu,
//     LoadFileDialog,
//     RegisterForm,
//     RemoveUserDialog,
//   ];
//   imports = [];
// }
