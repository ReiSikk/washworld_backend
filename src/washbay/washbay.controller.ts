import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { WashBayService } from './washbay.service';
import { CreateWashBayDto } from './dto/create-washbay.dto';
import { UpdateWashbayDto } from './dto/update-washbay.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('washbay')
export class WashbayController {
  constructor(private readonly washbayService: WashBayService) {}

  @Post()
  create(@Body() CreateWashBayDto: CreateWashBayDto) {
    return this.washbayService.create(CreateWashBayDto);
  }

  @Get()
  findAll() {
    return this.washbayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.washbayService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateWashbayDto: UpdateWashbayDto) {
    return this.washbayService.update(+id, updateWashbayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.washbayService.remove(+id);
  }
}
