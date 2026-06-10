import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserPlantSelectionsService } from '../user-plant-selections/user-plant-selections.service';
import { DevicesService } from '../devices/devices.service';
import { CareTaskService } from '../care-task/care-task.services';
import { SensorReadingsService } from '../sensor-readings/sensor-readings.service';
import { UserPlantSelection } from '../user-plant-selections/entities/user-plant-selection.entity';

@Injectable()
export class WebService {
  constructor(
    private userPlantSelectionsService: UserPlantSelectionsService,
    private devicesService: DevicesService,
    private careTaskService: CareTaskService,
    private sensorReadingsService: SensorReadingsService,
  ) {}
  async getUserDashboard(userId: number) {
    console.log("xuserId",userId)
    let x =   await    this.devicesService.findUserDevices(userId)
    console.log("xxx",x)
    let z = await   this.careTaskService.getTodayTasks(userId)
    console.log("zzz",z)
    let y = await this.userPlantSelectionsService.getUserSelections(userId)
    console.log("yyy",y)
    const [devices, selections, todayTasks] = await Promise.all([
      this.devicesService.findUserDevices(userId),
      this.userPlantSelectionsService.getUserSelections(userId),
      this.careTaskService.getTodayTasks(userId),
    ]);
console.log("[devices, selections, todayTask",{devices, selections, todayTasks});

    // ایندکس selections بر اساس deviceId برای O(1) lookup
    const selectionByDevice = new Map(selections.map((s) => [s.deviceId, s]));
    const devices$ = await Promise.all(
      devices.map(async (device) => {
        const [latestReadings, selection] = await Promise.all([
          this.sensorReadingsService.getReadingsForDevice(device.deviceId, 7),
          Promise.resolve(selectionByDevice.get(device.deviceId) ?? null),
        ]);
        return {
          id: device.id,
          name: device.name,
          status: device.status,
          createdAt: device.createdAt,
          plants: selection ? this.resolvePlantInfo(selection) : [],
          // plantSelection: selection
          //   ? {
          //       id: selection.id,
          //       plantSpecies: selection.plantSpecies
          //         ? {
          //             id: selection.plantSpecies.id,
          //             name: selection.plantSpecies.name,
          //             imageUrl: selection.plantSpecies.imageUrl ?? null,
          //           }
          //         : null,
          //       package: selection.package
          //         ? {
          //             id: selection.package.id,
          //             name: selection.package.name,
          //           }
          //         : null,
          //     }
          //   : null,
          latestReadings,
        };
      }),
    );
    console.log("nnnn",devices$);
    console.log("mmmm",selectionByDevice);
    
    return {
      plants:devices$[0].plants,
      deviceCount: devices.length,
      devices: devices$,
      todayTasks,
    };
  }
  private resolvePlantInfo(selection: UserPlantSelection): { name: string; imageUrl: string | null }[] {
  if (selection.plantSpecies) {
    return [{ name: selection.plantSpecies.name, imageUrl: selection.plantSpecies.imageUrl ?? null }];
  }
  if (selection.package?.items?.length) {
    return selection.package.items.map((item) => ({
      name: item.plantSpecies.name,
      imageUrl: item.plantSpecies.imageUrl ?? null,
    }));
  }
  return [];
}
}
