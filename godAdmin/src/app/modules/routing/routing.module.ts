import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { LoginComponent } from '../../pages/login/login.component';
import { PageNotFoundComponent } from '../../pages/page-not-found/page-not-found.component';
import { DronesListComponent } from '../../pages/drones-list/drones-list.component';
import { EngineListComponent } from '../../pages/engine-list/engine-list.component';
import { PropellerListComponent } from '../../pages/propeller-list/propeller-list.component';
import { ShieldListComponent } from '../../pages/shield-list/shield-list.component';
import { WeaponListComponent } from '../../pages/weapon-list/weapon-list.component';
import { GearListComponent } from '../../pages/gear-list/gear-list.component';
import { AttackListComponent } from '../../pages/attack-list/attack-list.component';
import { FireBonusListComponent } from '../../pages/fire-bonus-list/fire-bonus-list.component';
import { ElectricityBonusListComponent } from '../../pages/electricity-bonus-list/electricity-bonus-list.component';
import { ExplosiveBonusListComponent } from '../../pages/explosive-bonus-list/explosive-bonus-list.component';
import { PlayerListComponent } from '../../pages/player-list/player-list.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'drones', component: DronesListComponent},
	{ path: 'players', component: PlayerListComponent},
	{ path: 'attacks', component: AttackListComponent},
	{ path: 'gears', component: GearListComponent},
	{ path: 'engines', component: EngineListComponent},
	{ path: 'shields', component: ShieldListComponent},
	{ path: 'weapons', component: WeaponListComponent},
	{ path: 'propellers', component: PropellerListComponent},
	{ path: 'fire', component: FireBonusListComponent},
	{ path: 'electricity', component: ExplosiveBonusListComponent},
	{ path: 'explosive', component: ExplosiveBonusListComponent},
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes,
			// { enableTracing: true } // <-- debugging purposes only
		)
	],
	exports: [
		RouterModule
	]
})
export class RoutingModule { }
