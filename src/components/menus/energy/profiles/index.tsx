import { PowerProfileHeader } from './Header';
import { GpuModes } from './Profile';

export const EnergyProfiles = (): JSX.Element => {
    return (
        <box className="menu-section-container energy" vertical>
            <PowerProfileHeader />
            <GpuModes />
        </box>
    );
};
