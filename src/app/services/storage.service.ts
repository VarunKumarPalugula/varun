import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private storage: Storage
  ) { }

  addItem(key: string, value: string): Promise<any> {
    return this.storage.set(key, value);
  };

  getItem(key: string): Promise<any> {
    return this.storage.get(key)
  }

  removeItem(key: string): Promise<any> {
    return this.storage.remove(key)
  }

  // addItem(item: Item): Promise<any> {
  //   return this.storage.get(Items_key).then((items: Item[]) => {
  //     if (items) {
  //       items.push(item);
  //       return this.storage.set(Items_key, items);
  //     } else {
  //       return this.storage.set(Items_key, items);
  //     }
  //   });
  // }

  
  // updateItem(item: Item): Promise<any> {
  //   return this.storage.get(Items_key).then((items: Item[]) => {
  //     if (!items || items.length === 0) {
  //       return null;
  //     }

  //     let newItems: Item[] = [];

  //     for (let i of items) {
  //       if (i.id === items['id']) {
  //         newItems.push(item);
  //       } else {
  //         newItems.push(i);
  //       }
  //     }
  //     return this.storage.set(Items_key, newItems);

  //   });
  // }

  // deleteItem(id: number): Promise<Item> {
  //   return this.storage.get(Items_key).then((items: Item[]) => {
  //     if (!items || items.length === 0) {
  //       return null;
  //     }
  //     let toKeep: Item[] = [];

  //     for (let i of items) {
  //       if (i.id === id) {
  //         toKeep.push(i);
  //       }
  //     }
  //     return this.storage.set(Items_key, toKeep);
  //   });
  // }

}
