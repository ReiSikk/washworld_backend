import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WashStationService } from './wash-station.service';
import { CreateWashStationDto } from './dto/create-wash-station.dto';
import { UpdateWashStationDto } from './dto/update-wash-station.dto';

@Controller('washstation')
export class WashStationController {
  constructor(private readonly washStationService: WashStationService) {}

  @Post()
  create(@Body() createWashStationDto: CreateWashStationDto) {
    return this.washStationService.create(createWashStationDto);
  }

  @Get()
  findAll() {
    return this.washStationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.washStationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWashStationDto: UpdateWashStationDto) {
    return this.washStationService.update(+id, updateWashStationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.washStationService.remove(+id);
  }

  @Get(':id/isOpen')
  async isStationOpen(@Param('id') id: string): Promise<{ isOpen: boolean }> {
    const isOpen = await this.washStationService.isStationOpen(Number(id));
    return { isOpen };
  }
}
