declare module "*.png" { // настройки для TS чтобы он обрабатывал png файлы корректно
  const content: any;
  export default content;
}

declare module "*.svg" {
    const content: any;
    export default content;
  }

  declare module "*.scss" { // чтобы TS корректно импортировал scss файлы
    const content: any;
    export default content;
  }