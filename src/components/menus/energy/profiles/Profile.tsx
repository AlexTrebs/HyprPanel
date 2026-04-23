import { execAsync } from 'astal';
import { Gtk } from 'astal/gtk3';
import GLib from 'gi://GLib';
import { isPrimaryClick } from 'src/lib/events/mouse';
import icons from 'src/lib/icons/icons';
import { GpuModeType } from './types';

const GPU_MODES: GpuModeType[] = ['Integrated', 'Hybrid', 'AsusMuxDgpu'];
const GPU_MODE_ARGS: Record<GpuModeType, string> = {
    Integrated: 'integrated',
    Hybrid: 'hybrid',
    AsusMuxDgpu: 'mux',
};
const GPU_MODE_LABELS: Record<GpuModeType, string> = {
    Integrated: 'Integrated',
    Hybrid: 'Hybrid',
    AsusMuxDgpu: 'MUX dGPU',
};

export const GpuModes = (): JSX.Element => {
    return (
        <box className="menu-items-section" valign={Gtk.Align.FILL} vexpand vertical>
            {GPU_MODES.map((mode: GpuModeType) => (
                <button
                    className="power-profile-item"
                    onClick={(_, event) => {
                        if (isPrimaryClick(event)) {
                            execAsync([
                                `${GLib.get_home_dir()}/.local/bin/supergfxctl-toggle.sh`,
                                GPU_MODE_ARGS[mode],
                            ]).catch(console.error);
                        }
                    }}
                >
                    <box>
                        <icon
                            className="power-profile-icon"
                            icon={icons.asusctl.mode[mode] || 'processor-symbolic'}
                        />
                        <label className="power-profile-label" label={GPU_MODE_LABELS[mode]} />
                    </box>
                </button>
            ))}
        </box>
    );
};
