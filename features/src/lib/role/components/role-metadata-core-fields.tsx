import { Label, Input, Textarea, Switch } from '@apollo/ui';
import { useFormContext } from 'react-hook-form';

export const RoleMetadataCoreFields = () => {
  const { register, watch } = useFormContext();
  const ipWhitelistEnabled = watch('enableIPWhitelist');

  return (
    <div className="space-y-6">
      <Label className="text-muted-foreground">
        Role Metadata & Core Settings
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Static Display Fields */}
          <div className="space-y-1">
            <Label>Role Name</Label>
            <p>{watch('role')}</p>
          </div>
          <div className="space-y-1">
            <Label>Role ID</Label>
            <p>{watch('roleId')}</p>
          </div>
          <div className="space-y-1">
            <Label>Priority Level</Label>
            <p>1</p>
          </div>
          {/* Require 2FA */}
          <div className="flex items-center justify-between">
            <Label>Require Two-Factor Authentication</Label>
            <Switch {...register('require2FA')} />
          </div>
          {/* Enable IP Whitelist */}
          <div className="flex items-center justify-between">
            <Label>Enable IP Whitelist</Label>
            <Switch {...register('enableIPWhitelist')} />
          </div>
          {/* IP List Input (Conditional) */}
          {ipWhitelistEnabled && (
            <div className="flex flex-col gap-2">
              <Label>Allowed IPs (comma-separated)</Label>
              <Textarea
                className="min-h-[80px]"
                placeholder="e.g. 192.168.1.1, 10.0.0.5"
                {...register('ipList')}
              />
            </div>
          )}
        </div>
        <div className="space-y-6">
          {/* Editable Fields */}
          <div className="flex flex-col gap-2">
            <Label>Session Timeout (minutes)</Label>
            <Input
              type="number"
              {...register('sessionTimeout', { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Max Concurrent Sessions</Label>
            <Input
              type="number"
              {...register('maxSessions', { valueAsNumber: true })}
            />
          </div>
          {/* Static Display Fields */}
          <div className="space-y-1">
            <Label>Role Status</Label>
            <p>Locked (System Role)</p>
          </div>
          <div className="space-y-1">
            <Label>Server Scope</Label>
            <p>All Trading Servers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
